import { useState, useEffect, type RefObject } from 'react';

/**
 * Custom hook to detect when an element is visible on the screen.
 * Animates only once.
 * @param ref - A React ref attached to the element to observe.
 * @param rootMargin - Margin around the root. Can be used to trigger the intersection earlier or later.
 * @returns boolean - True if the element is intersecting, false otherwise.
 */
export function useOnScreen(ref: RefObject<HTMLElement | null>, rootMargin: string = '0px'): boolean {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        // Se já foi visualizado, não precisa observar novamente (animação única)
        if (isIntersecting) return;

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect(); // Desconecta completamente
                }
            },
            { rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, rootMargin, isIntersecting]);

    return isIntersecting;
}