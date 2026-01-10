'use client';

import { motion } from 'framer-motion';

interface MotionWrapperProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    type?: 'fade' | 'slideUp' | 'scale';
}

export default function MotionWrapper({
    children,
    delay = 0,
    className = "",
    type = 'slideUp'
}: MotionWrapperProps) {

    const variants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slideUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants[type]}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
