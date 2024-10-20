import React, { useState } from "react";
import {
    View,
    Text,
    Clipboard,
    StyleSheet,
} from "react-native";

import InputBox from "./components/InputBox";
import FormCheckBox from "./components/FormCheckBox";
import Output from "./components/Output";
import Btn from "./components/Btn";
import { generatePasswordString } from "./utility/passwordGenerator";
import { PasswordRequirement } from "./utility/Consts";
import {
    showErrorSnackbar,
    showSuccessSnackBar,
    showInfoSnackBar
} from './utility/utils';


function Main() : React.JSX.Element {
    const [passLength, setPassLength] = useState('');
    const [isLower, setIsLower] = useState(false);
    const [isUpper, setIsUpper] = useState(false);
    const [isSpecial, setIsSpecial] = useState(false);
    const [isNumber, setIsNumber] = useState(false); 
    const [generatedPassword, setGeneratedPassword] = useState('');

    const passwordRequirements: PasswordRequirement = {
        length: Number(passLength),
        includeUpper: isUpper,
        includeLower: isLower,
        includeNumber: isNumber,
        includeSymbol: isSpecial,

    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerTxt}>Main Component</Text>
            <InputBox passLength={passLength} setPassLength={setPassLength}/>
            <FormCheckBox id="1" label="Upper Case Letter" checkBoxColor="#75bce9" isChecked={isUpper} setIsChecked={setIsUpper}/>
            <FormCheckBox id="2" label="Lower Case Letter" checkBoxColor="#9bada3" isChecked={isLower} setIsChecked={setIsLower}/>
            <FormCheckBox id="3" label="Special Character" checkBoxColor="#ffdac1" isChecked={isSpecial} setIsChecked={setIsSpecial}/>
            <FormCheckBox id="4" label="Numbers" checkBoxColor="#edb9fc" isChecked={isNumber} setIsChecked={setIsNumber}/>
            <Output generatedPassword={generatedPassword} placeholder="Select Options..." handleCopy={(generatedPassword) => {
                Clipboard.setString(generatedPassword)
                showSuccessSnackBar('Copied to clipboard');
            }
            }/>
            <Btn type={1} title="Generate Password" onPress={()=> {
                if ((Number(passLength) < 8 || Number(passLength) > 16) || !/^[0-9]+$/.test(passLength)) {
                    showErrorSnackbar('Invalid length value');
                }
                else if (!isLower && !isUpper && !isNumber && !isSpecial) {
                    showErrorSnackbar('You must select at least one option');
                }
                else {
                const password = generatePasswordString(passwordRequirements);
                setGeneratedPassword(password);
}

            }}
            />
            <Btn type={2} title="Reset" onPress={() => {

                setIsLower(false);
                setIsUpper(false);
                setIsNumber(false);
                setIsSpecial(false);
                setPassLength("");
                setGeneratedPassword("");
                showInfoSnackBar('Cleared.');
                
            }} />


        </View>
    );
}

const styles = StyleSheet.create({
    headerTxt: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 30,
        color: 'black',
    },

    container: {
        padding: 10,
        alignItems: 'center',
        gap: 10,
        margin: 20,
    }
})
    

export default Main;