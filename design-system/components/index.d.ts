type IconName = "search" | "bag" | "heart" | "user" | "arrow" | "truck" | "swap" | "star" | "ruler";
type Shape = "heel" | "flat" | "boot" | "sneaker";
type Tone = "soft" | "raised" | "espresso";

export declare function Button(props: { variant?: "primary" | "outline" | "onDark" | "link"; size?: "sm"; block?: boolean; icon?: IconName; disabled?: boolean; onClick?: () => void; children: React.ReactNode }): JSX.Element;
export declare function Tag(props: { tone?: "sale" | "solid"; children: React.ReactNode }): JSX.Element;
export declare function Icon(props: { name: IconName; label?: string; className?: string }): JSX.Element;
export declare function ProductImage(props: { src?: string; alt?: string; tone?: Tone; shape?: Shape; children?: React.ReactNode }): JSX.Element;
export declare function ProductCard(props: { name: string; price: number; salePrice?: number; category?: string; isNew?: boolean; colors?: string[]; image?: string; tone?: Tone; shape?: Shape; currency?: string; favorite?: boolean }): JSX.Element;
export declare function SizePicker(props: { sizes?: number[]; soldOut?: number[]; value?: number; onChange?: (size: number) => void }): JSX.Element;
export declare function Header(props: { links?: string[]; current?: string; bagCount?: number; promo?: string | false; logo?: string }): JSX.Element;
export declare function CategoryTile(props: { name: string; count?: number; image?: string; tone?: Tone; shape?: Shape; href?: string }): JSX.Element;
export declare function Storefront(props: { currency?: string }): JSX.Element;
export declare function ProductPage(props: { currency?: string }): JSX.Element;
