function Pattern() {
    return (
        <div className="absolute inset-0 z-0 rounded-md m-auto
        bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg),_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)]
        bg-[size:10px_10px] bg-fixed pointer-events-none
        "></div>
    )
}

export default Pattern