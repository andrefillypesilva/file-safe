export default function jsonMock() {
    return {
        parse: (value: string) => value,
        stringify: (value: any) => `${value}`
    }
}
