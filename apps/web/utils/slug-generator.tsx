export default function slugGenerator(...args: string[]) {
    return args.map((arg) => arg.trim().replace(/\s+/g, "-")).join("-");
}