export function append(form: FormData, key: string, value: any) {
    if (value !== undefined) {
        form.append(key, value.toString());
    }
}
