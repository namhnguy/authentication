import React from "react"
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useRouter } from "next/router"
import { Checkbox, CheckboxGroup } from "@chakra-ui/react"
import { useState, useEffect } from "react"

export default function macrotags() {
    const router = useRouter()
    const [macroArray, setMacroArray] = useState([])
    const [checkedItems, setCheckedItems] = useState([false, false, false, false, false])

    useEffect(() => {
        setMacroArray([])
        if (checkedItems[0]) {
            setMacroArray(arr => [...arr, "Diabetes"])
        }
        if (checkedItems[1]) {
            setMacroArray(arr => [...arr, "Heart Disease"])
        }
        if (checkedItems[2]) {
            setMacroArray(arr => [...arr, "Cancer"])
        }
        if (checkedItems[3]) {
            setMacroArray(arr => [...arr, "Acute Liver Failure"])
        }
        if (checkedItems[4]) {
            setMacroArray(arr => [...arr, "Multiple Sclerosis"])
        }
    }, [checkedItems])

    return (
        <Flex height="90vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={6} rounded={6}>
                <Heading textAlign="center" fontSize="22" textColor="black" mb={50}>What would you like to learn about?</Heading>
                <Checkbox mb={10} textColor="black" justifyContent="center" onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2], checkedItems[3], checkedItems[4]])} >Diabetes</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center" onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2], checkedItems[3], checkedItems[4]])} >Heart Disease</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked, checkedItems[3], checkedItems[4]])} >Cancer</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], checkedItems[2], e.target.checked, checkedItems[4]])} >Acute Liver Failure</Checkbox>
                <Checkbox mb={10} textColor="black" justifyContent="center" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], checkedItems[2], checkedItems[3], e.target.checked])} >Multiple Sclerosis</Checkbox>
                {console.log(checkedItems)}
                {console.log(macroArray)}
                <Button background="gray.900" textColor='white' onClick={() => { router.push("./landingpage") } }>Done</Button>
            </Flex>
        </Flex>
    )
}
