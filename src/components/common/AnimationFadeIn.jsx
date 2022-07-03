import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import PropTypes from "prop-types";

function AnimationFadeIn(props) {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.1}}>
                <div className={props.className}>
                    {props.children}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

AnimationFadeIn.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
}

export default AnimationFadeIn