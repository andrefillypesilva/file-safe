export default function jsonMock() {
    return {
        parse: (value: string) => {
            if (value === 'true') return true;
            if (value === 'false') return false; 
            return value;
        },
        stringify: (value: any) => `${value}`
    }
}
