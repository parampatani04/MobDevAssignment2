

import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type CheckBoxProps = {
    id: string;
    label: string;
    checkBoxColor: string;
    isChecked: boolean;
    setIsChecked: (value: boolean) => void;
};

const FormCheckBox: React.FC<CheckBoxProps> = ({
    id,
    label,
    checkBoxColor,
    isChecked,
    setIsChecked,
}) => {
    const handlePress = () => {
        setIsChecked(!isChecked);
    };

    return (
        <BouncyCheckbox
            id={id}
            text={label}
            fillColor={checkBoxColor}
            isChecked={isChecked}
            onPress={handlePress}
        />
    );
};

export default FormCheckBox;