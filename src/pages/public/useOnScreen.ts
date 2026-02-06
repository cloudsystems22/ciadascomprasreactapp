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
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.unobserve(element);
                }
            },
            { rootMargin }
        );

        observer.observe(element);

        return () => observer.unobserve(element);
    }, [ref, rootMargin]);

    return isIntersecting;
}