type HeadingProp = {
    title : string
}

function Heading({title}: HeadingProp) {
    return (
        <h2 className="mb-8 inline-block relative text-4xl md:text-3xl font-semibold after:left-0
        after:absolute after:-bottom-1.5
        after:h-[4] after:w-1/2 after:bg-primary">{title}</h2>
    )
}

export default Heading