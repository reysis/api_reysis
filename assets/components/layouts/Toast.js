import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * toastList structure
 */
// {
//     id: 1,
//     title: 'Success',
//     description: 'This is a success toast component',
//     backgroundColor: '#5cb85c',
//     icon: checkIcon
// }

const Toast = ({ toastList, position, autoDelete, autoDeleteTime }) => {
    const [list, setList] = useState(toastList);
    const [classType, setClassType] = useState();

    console.log(toastList, position,autoDelete, autoDeleteTime);


    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, autoDeleteTime);
        return () => {
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);

    const deleteToast = id => {
        const index = list.findIndex(e => e.id === id);
        list.splice(index, 1);
        const toastListItem = toastList.findIndex(e => e.id === id);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <div
            className={`notification-container ${position}`}
        >
            {
                list.map((toast, i) =>
                    <div
                        key={i}
                        className={`notification toast ${position} ${toast.type}`}
                    >
                        <button onClick={() => deleteToast(toast.id)}>
                            X
                        </button>
                        <div className="notification-image">
                            <FontAwesomeIcon icon={toast.icon}/>
                        </div>
                        <div>
                            <p className="notification-title">{toast.title}</p>
                            <p className="notification-message">
                                {toast.description}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

Toast.defaultProps = {
    position: 'bottom-left'
}

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    autoDeleteTime: PropTypes.number
}

export default Toast;
