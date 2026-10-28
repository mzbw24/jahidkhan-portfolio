import {
  ArrowRight, Award, Banknote, BookOpen, Briefcase, Building2, Bus, CalendarDays, Car, Clock,
  Compass, Cpu, Droplets, Eye, Flag, Globe, GraduationCap, HandHeart, Handshake, Heart,
  HeartPulse, Home, Hospital, Landmark, Leaf, Lightbulb, Mail, Map as MapIcon, MapPin,
  MessageCircle, Mic, Network, Newspaper, Phone, Plane, Play, Quote, Recycle, Rocket, Scale,
  Send, ShieldCheck, Smartphone, Sprout, Star, Stethoscope, Target, Trees, TrendingUp, Users,
  Video, Wifi, type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/types/common";

/** Typed as Record<IconName, …> so a missing icon is a compile error. */
const icons: Record<IconName, LucideIcon> = {
  users: Users, plane: Plane, graduation: GraduationCap, heart: Heart, building: Building2,
  leaf: Leaf, shield: ShieldCheck, lightbulb: Lightbulb, pin: MapPin, mail: Mail, phone: Phone,
  message: MessageCircle, calendar: CalendarDays, clock: Clock, globe: Globe, handshake: Handshake,
  pulse: HeartPulse, recycle: Recycle, trees: Trees, bus: Bus, briefcase: Briefcase, cpu: Cpu,
  landmark: Landmark, eye: Eye, home: Home, book: BookOpen, sprout: Sprout, network: Network,
  trend: TrendingUp, smartphone: Smartphone, stethoscope: Stethoscope, banknote: Banknote,
  handHeart: HandHeart, scale: Scale, video: Video, play: Play, arrowRight: ArrowRight,
  quote: Quote, send: Send, car: Car, hospital: Hospital, compass: Compass, target: Target,
  award: Award, mic: Mic, newspaper: Newspaper, wifi: Wifi, droplets: Droplets, map: MapIcon,
  rocket: Rocket, flag: Flag, star: Star,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} />;
}
