

// Função com proposito de validar se um Date ja passou de algum x dia ou dias
export const checkIfTheDateTimeHasPassedACertainNumberOfDays = (date: Date, days: number): Boolean => {
    const now = new Date();
    const daysInMs = days * 24 * 60 * 60 * 1000;
    return now.getTime() - date.getTime() >= daysInMs;
}
