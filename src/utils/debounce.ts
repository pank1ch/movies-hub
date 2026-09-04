export const debounce = (fn: (...args: any[]) => any, delay: number) => {

  let timer: ReturnType<typeof setTimeout> | undefined;

  return (query: string) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(query)
    }, delay)
  }
}
