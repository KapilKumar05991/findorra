interface BannerTextProp {
    title: string
    text: string
}

export default function BannerText({title,text}:BannerTextProp) {
    return (
        <div className="w-fit mx-6 my-10 text-background">
            <h4 className="text-2xl">{title.toUpperCase()}</h4>
            <p>{text}</p>
        </div>
    )
}