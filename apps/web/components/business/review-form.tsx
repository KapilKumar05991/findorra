import { Star } from "lucide-react";

export default function ReviewForm() {
    return (
        <form action="">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Star className="cursor-pointer" color="gold" fill="gold" size={20} />
                    <Star className="cursor-pointer" color="gold" fill="gold" size={20} />
                    <Star className="cursor-pointer" color="gold" fill="gold" size={20} />
                    <Star className="cursor-pointer" color="gold" size={20} />
                    <Star className="cursor-pointer" color="gold" size={20} />
                </div>
            </div>
        </form>
    )
}