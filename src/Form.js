import React, { useState, useEffect } from "react";
import * as yup from 'yup'
import axios from 'axios';
import Input from "./Input";

export default function Form() {
    //react state
    const defaultState = {
        name: '',
        email: '',
        password: '',
        terms: false
    };
    const [users, setUsers] = useState([])
    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState({...defaultState, terms:''});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //formState schema
    let formSchema = yup.object().shape({
        name: yup.string().required("Pleae provide name."),
        email: yup
            .string()
            .required("Please provide an email.")
            .email('This is not a valid email.'),
        password: yup
            .string()
            .required("Please enter a Password."),
        terms: yup
        .boolean()
        .oneOf([true], "Please agree to the terms and conditions")
    });

    useEffect(() => {
        if (formState.terms) {
            setButtonDisabled(!formState.terms);
        }
    }, [formState]);

    //onSubmit function
    const formSubmit = e => {
        e.preventDefault();
        console.log("formsubmitted!");
        axios
            .post('https:reqres.in/api/users', formState)
            .then(() => console.log("form submit success"))
            .catch(err => console.log(err));
        setUsers([...users, JSON.stringify({formState})]);
        console.log(JSON.stringify(users));
    };

    //validation
    const validateChange = e => {
        e.persist();

        // yup.reach(formSchema, e.target.name)
        // .validate()
        // .then(valid => setErrors({
        //     ...errors,
        //     [e.target.name]: ''
        //     })
        // )
        // .catch(error => setErrors({
        //     ...errors,
        //     [e.target.name]: error.errors[0]
        //     })
        // );
        if (e.target.value.length === 0) {
            setErrors({
                ...errors,
                [e.target.name]: `${e.target.name} field is required`
            });
        }
    };
    const inputChange = e => {

        const value = 
            e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        });
        validateChange(e);
    };

    return (
        <form onSubmit={formSubmit}>
            <Input
                type = "text"
                name="name"
                onChange={inputChange}
                value={formState.name}
                label="Name"
                errors={errors}
            />
            <Input
                type="email"
                name="email"
                onChange={inputChange}
                value={formState.email}
                label="Email"
                errors={errors}
            />
            <Input
                type="password"
                name="password"
                onChange={inputChange}
                value={formState.password}
                label="Password"
                errors={errors}
            />
            <label className="terms" htmlFor="terms">
                <input name="terms" type="checkbox" onChange={inputChange} />
                Terms & Conditions
            </label>
            <button disabled={buttonDisabled}>Submit</button>
            <div>{users}</div>
        </form>
        );
}
