import heroPortraitImg from '../assets/images/princess_portrait_pose_1794936092240.jpg';
import gardenPortraitImg from '../assets/images/princess_garden_pose_1794936092355.jpg';
import eveningPortraitImg from '../assets/images/princess_evening_pose_1794936091653.jpg';
import candidPortraitImg from '../assets/images/princess_candid_pose_1794936094154.jpg';
import terracePortraitImg from '../assets/images/princess_terrace_pose_1794936093291.jpg';

export interface PortraitItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  caption: string;
  alt: string;
  setting: string;
  orientation: 'portrait' | 'landscape';
}

export interface VirtueItem {
  index: string;
  title: string;
  summary: string;
  detail: string;
}

export interface StarChapter {
  id: string;
  label: string;
  heading: string;
  message: string;
  constellationNote: string;
}

export const HERO_PORTRAIT: PortraitItem = {
  id: 'royal-portrait',
  src: heroPortraitImg,
  title: 'A Crown of Grace',
  subtitle: 'Golden Hour Balcony Glance',
  caption:
    'Turning gracefully beside the palace balustrade under blooming arches—capturing the quiet warmth that makes every moment luminous.',
  alt: 'Nandita Jayswal looking gracefully over her shoulder in a pastel blush-pink and champagne-gold princess gown with a delicate crystal tiara under a golden-hour floral archway.',
  setting: 'Golden Hour Palace Balcony',
  orientation: 'portrait',
};

export const GALLERY_PORTRAITS: PortraitItem[] = [
  {
    id: 'garden',
    src: gardenPortraitImg,
    title: 'Enchanted Rose Walk',
    subtitle: 'Lavender Tulle & Sunlit Roses',
    caption:
      'Captured mid-stride along a rose-lined garden path—an unfiltered laugh, flowing lilac tulle, and joyful lightness.',
    alt: 'Nandita Jayswal walking candidly through a rose-lined garden path in a lavender-lilac lace and tulle princess gown, laughing joyfully toward blooming pink roses.',
    setting: 'Sun-Dappled Rose Walk',
    orientation: 'landscape',
  },
  {
    id: 'evening',
    src: eveningPortraitImg,
    title: 'Starlight Courtyard',
    subtitle: 'Midnight Velvet & Brass Lanterns',
    caption:
      'Seated calmly on carved heritage steps among glowing evening lanterns—carrying timeless poise and quiet confidence.',
    alt: 'Nandita Jayswal seated gracefully on stone steps of a heritage palace courtyard beside glowing brass lanterns, wearing a deep sapphire-velvet and gold princess evening gown.',
    setting: 'Twilight Heritage Steps',
    orientation: 'portrait',
  },
  {
    id: 'candid',
    src: candidPortraitImg,
    title: 'The Glass Conservatory',
    subtitle: 'Cream Ruffles & White Roses',
    caption:
      'Leaning gently beside sunlit white roses with a dainty tiara—warm, serene, and naturally radiant.',
    alt: 'Nandita Jayswal leaning beside a table of cream garden roses in a sunlit conservatory, tilting her head with a gentle smile while holding a cream rose.',
    setting: 'White Rose Conservatory',
    orientation: 'portrait',
  },
  {
    id: 'terrace',
    src: terracePortraitImg,
    title: 'Dawn Sandstone Terrace',
    subtitle: 'Ivory Silk & Morning Breeze',
    caption:
      'Gazing out across sunlit courtyard arches as morning light catches her hair—celebrating dignity, peace, and hopeful horizons.',
    alt: 'Nandita Jayswal standing in three-quarter profile beside a carved sandstone palace archway, one hand resting on the pillar in golden morning sunlight.',
    setting: 'Carved Sandstone Terrace',
    orientation: 'landscape',
  },
];

export const ROYAL_VIRTUES: VirtueItem[] = [
  {
    index: '01',
    title: 'Radiant Warmth',
    summary: 'A smile that turns quiet moments into treasured memories.',
    detail:
      'Even in simple everyday moments, your genuine warmth and cheerful spirit bring unmistakable brightness and ease to everyone around you.',
  },
  {
    index: '02',
    title: 'Graceful Strength',
    summary: 'Stepping through every chapter with dignity, courage, and poise.',
    detail:
      'True royalty shines through quiet resilience—meeting life with patience, self-respect, and calm determination in every season.',
  },
  {
    index: '03',
    title: 'A Heart of Gold',
    summary: 'Thoughtful kindness whose presence feels like calm sunshine.',
    detail:
      'You care sincerely, encourage generously, and stay authentic. The kindness you put out into the world deserves to return to you tenfold.',
  },
];

export const ROYAL_BLESSINGS: string[] = [
  'Warmest wishes from a well wisher: may every path you walk, Nandita, be lined with peace and quiet triumphs.',
  'Wishing Nandita a year ahead filled with sunlit mornings, proud milestones, and lasting happiness.',
  'May life always treat your gentle heart with the exact same kindness and respect you bring into the world.',
  'Here is to your unshakeable spirit—keep dreaming boldly, smiling freely, and shining brightly.',
  'May every dream you carry quietly take flight, bringing you endless reasons to celebrate.',
];

export const STAR_CHAPTERS: StarChapter[] = [
  {
    id: 'warmth',
    label: 'Kindness',
    heading: 'Grace That Lights the Room',
    message:
      'Genuine kindness leaves a lasting glow wherever it goes—a quiet reminder of how deeply your warmth and sincerity are appreciated.',
    constellationNote: 'Twin Stars · Warmest Wishes',
  },
  {
    id: 'laughter',
    label: 'Joy',
    heading: 'Bright Moments Ahead',
    message:
      'Wishing you countless sunlit afternoons, effortless laughter, and small joyful surprises that make ordinary days feel extraordinary.',
    constellationNote: 'Bright Orbit · Joyful Chapters',
  },
  {
    id: 'resilience',
    label: 'Strength',
    heading: 'Steady Through Every Season',
    message:
      'Whenever challenges arise, may you always recognize your own quiet strength, poised confidence, and ability to rise above every storm.',
    constellationNote: 'Guiding Trail · Quiet Strength',
  },
  {
    id: 'always',
    label: 'Well Wishes',
    heading: 'Always Wishing You the Best',
    message:
      'Today on Princess Day and on every tomorrow that follows, a well wisher sends sincere blessings for your health, peace, and success, Nandita.',
    constellationNote: 'Enduring Light · From a Well Wisher',
  },
];
