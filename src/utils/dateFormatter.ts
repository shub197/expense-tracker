const getFormattedDate = (date: string | Date | null | undefined): string | null => {
    if (!date) return null;
    const dateProperties = new Date(date);

    return dateProperties.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

export { getFormattedDate };