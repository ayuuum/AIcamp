'use client';

import { useEffect, useRef, ReactNode } from 'react';

type ScrollRevealProps = {
    children: ReactNode;
    width?: '100%' | 'auto';
    delay?: number; // ms
};

export default function ScrollReveal({ children, width = '100%', delay = 0 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Apply a small delay if specified
                        setTimeout(() => {
                            if (ref.current) {
                                ref.current.classList.add('visible');
                                ref.current.classList.remove('invisible');
                            }
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className="reveal-item invisible"
            style={{ width }}
        >
            {children}
        </div>
    );
}
