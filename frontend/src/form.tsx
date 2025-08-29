import axios from 'axios'
import React, { useState, type ChangeEvent } from 'react'

interface Usertype {
    username: string,
    password: string
}

function Form() {


    const [form, setform] = useState<Usertype>({
        username: "",
        password: ""
    })
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() // prevent page refresh
        try {
            const res = await axios.post("http://localhost:3000/signup", form)
            console.log(res.data)
        } catch (err) {
            console.error("Error while signing up:", err)
        }
    }

    const handlleChange = (e: any) => {
        const { name, value } = e.target;
        setform((prev) => ({
            ...prev,
            [name]: value,
        }))

    }
    console.log(form)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder='username'
                    type='text'
                    name='username'
                    value={form.username}
                    onChange={handlleChange}

                />
                <input placeholder='password'
                    type='text'
                    name='password'
                    value={form.password}
                    onChange={handlleChange}
                />
                <button type='submit'>click</button>

            </form>
        </>

    )
}

export default Form