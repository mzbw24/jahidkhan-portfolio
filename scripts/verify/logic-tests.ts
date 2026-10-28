import assert from "node:assert/strict";
import { buildWhatsAppMessage, buildWhatsAppUrl, isWhatsAppConfigured, normalizeNumber } from "@/lib/whatsapp";
import { validateContactForm } from "@/lib/validation";
import { contactEn } from "@/data/en/contact";
import { contactBn } from "@/data/bn/contact";

// placeholder must NOT count as configured
assert.equal(isWhatsAppConfigured("REPLACE_WITH_WHATSAPP_NUMBER"), false);
assert.equal(isWhatsAppConfigured(""), false);
assert.equal(isWhatsAppConfigured("123"), false);
assert.equal(isWhatsAppConfigured("+1 (555) 123-4567"), true);
assert.equal(normalizeNumber("+1 (555) 123-4567"), "15551234567");

const good = { name: "Rahim Uddin", email: "rahim@example.com", countryCode: "+880", phone: "1712 345678", subject: "business", message: "I would like to discuss a partnership.\nSecond line." };
assert.deepEqual(validateContactForm(good), {});
const bad = validateContactForm({ name: "A", email: "nope", countryCode: "+1", phone: "12", subject: "", message: "short" });
assert.deepEqual(bad, { name: "nameShort", email: "email", phone: "phone", subject: "subject", message: "messageShort" });
assert.deepEqual(Object.keys(validateContactForm({ name: "", email: "", countryCode: "+1", phone: "", subject: "", message: "" })).sort(), ["email", "message", "name", "subject"]);
assert.equal(validateContactForm({ ...good, phone: "abc12345678" }).phone, "phone"); // letters rejected
assert.equal(validateContactForm({ ...good, phone: "" }).phone, undefined);            // optional

for (const [lang, c] of [["en", contactEn], ["bn", contactBn]] as const) {
  const f = c.form;
  const msg = buildWhatsAppMessage(good, f.fields.subject.options.business, f.whatsapp.labels, f.whatsapp.heading);
  const lines = msg.split("\n");
  console.log(`--- ${lang} message ---\n${msg}\n`);
  assert.ok(lines[0]!.startsWith("*"));
  for (const label of Object.values(f.whatsapp.labels)) assert.ok(lines.some((l) => l.startsWith(`*${label}:*`)), `${lang}: missing labelled line ${label}`);
  assert.ok(lines.some((l) => l.includes("+880 1712 345678")));
  const url = buildWhatsAppUrl(msg, "+1 (555) 123-4567");
  assert.ok(url.startsWith("https://wa.me/15551234567?text="));
  assert.equal(decodeURIComponent(url.split("?text=")[1]!), msg); // round-trips, incl. Bangla + newlines
}
console.log("logic tests passed");
