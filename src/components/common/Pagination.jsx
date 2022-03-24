import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


function PaginationButton(props) {
    const classes = classNames(
        'w-10 h-10', // spacing
        'bg-white hover:bg-gray-100', // background
        'border', // border
        'leading-none text-center select-none', // text
        'cursor-pointer', // other
        'flex justify-center items-center', // alignment
        { 'font-bold': props.active },
    )

    return (
        <div className={classes} onClick={props.onClick}>
            {props.label}
        </div>
    )
}

PaginationButton.propTypes = {
    label: PropTypes.any.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}


function Pagination(props) {
    const [currentGroup, setCurrentGroup] = useState(0)
    const [groupCount, setGroupCount] = useState(calculateGroupCount())

    function calculateGroupSlice() {
        const start = currentGroup * props.groupSize
        const end = (currentGroup + 1) * props.groupSize - 1
        return [start, end]
    }

    function calculateGroupCount() {
        return Math.ceil(props.itemCount / props.groupSize)
    }

    function setActiveGroup(group) {
        if (group < 0) {
            return
        }
        if (group > groupCount - 1) {
            return
        }
        setCurrentGroup(group)
    }

    function renderButtons() {
        const offset = 2
        let buttons = []

        // no breaking
        if (groupCount <= offset * 3 + 1) {
            for (let i = 0; i < groupCount; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }
            return buttons
        }

        // breaking in the middle
        if (currentGroup <= offset - 1 || currentGroup >= groupCount - offset) {
            for (let i = 0; i < offset + 1; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }
            buttons.push(<PaginationButton label="..." onClick={() => { }} />)
            for (let i = groupCount - offset - 1; i < groupCount; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }
            return buttons
        }

        // left breaking transition
        if (currentGroup == offset) {
            for (let i = 0; i < offset + 2; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }

            buttons.push(<PaginationButton label="..." onClick={() => { }} />)
            for (let i = groupCount - offset; i < groupCount; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }
            return buttons
        }

        // right breaking transition
        if (currentGroup == groupCount - offset - 1) {
            for (let i = 0; i < offset; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }

            buttons.push(<PaginationButton label="..." onClick={() => { }} />)
            for (let i = groupCount - offset - 2; i < groupCount; i++) {
                buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
            }
            return buttons
        }

        // breaking on the side
        buttons.push(<PaginationButton label={1} active={currentGroup === 0} onClick={() => setActiveGroup(0)} />)
        buttons.push(<PaginationButton label="..." onClick={() => { }} />)
        for (let i = currentGroup - offset + 1; i < currentGroup + offset; i++) {
            buttons.push(<PaginationButton label={i + 1} active={currentGroup === i} onClick={() => setActiveGroup(i)} />)
        }
        buttons.push(<PaginationButton label="..." onClick={() => { }} />)
        buttons.push(<PaginationButton label={groupCount} active={currentGroup === groupCount} onClick={() => setActiveGroup(groupCount - 1)} />)

        return buttons
    }

    useEffect(() => {
        setGroupCount(calculateGroupCount())
    }, [props.itemCount, props.groupSize])

    useEffect(() => {
        if (currentGroup) {
            props.onChange(calculateGroupSlice())
        }
    }, [currentGroup])

    return (
        <div className='flex'>
            <PaginationButton label='<' onClick={() => setActiveGroup(currentGroup - 1)} />
            {renderButtons().map(i => i)}
            <PaginationButton label='>' onClick={() => setActiveGroup(currentGroup + 1)} />
        </div>
    )
}

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    groupSize: PropTypes.number,
    onChange: PropTypes.func,
}

Pagination.defaultProps = {
    groupSize: 5,
}

export default Pagination