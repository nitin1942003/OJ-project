import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { register as registerService } from '../services/authService'


const NAME_REGEX = /^[a-zA-Z]{1,50}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const RegistrationForm = () => {

    const firstnameRef = useRef()
    const errorRef = useRef()

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [firstnameFocus, setFirstnameFocus] = useState(false)

    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false)
    const [lastnameFocus, setLastnameFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    //Focus on component mount should be on the first field
    useEffect(() => {
        firstnameRef.current.focus()
    }, [])

    //Validation
    useEffect(() => {
        const result = NAME_REGEX.test(firstname)
        console.log(result)
        console.log(firstname)
        setValidFirstname(result)
    }, [firstname])

    useEffect(() => {
        const result = NAME_REGEX.test(lastname)
        console.log(result)
        console.log(lastname)
        setValidLastname(result)
    }, [lastname])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPassword(result)

        const match = password === matchPassword
        setValidMatchPassword(match)
    }, [password, matchPassword])

    //Clears the error when user edits or corrects the form field
    useEffect(() => {
        setError('')
    }, [firstname, lastname, email, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //If button is hacked, this will prevent invalid data entry
        const test1 = NAME_REGEX.test(firstname)
        const test2 = NAME_REGEX.test(lastname)
        const test3 = EMAIL_REGEX.test(email)
        const test4 = PASSWORD_REGEX.test(password)

        if (!test1 || !test2 || !test3 || !test4) {
            setError('Invalid Entry')
            return
        }

        const formData = { firstname, lastname, email, password }
        try {
            await registerService(formData)
            setSuccess(true)
            setFirstname('')
            setLastname('')
            setEmail('')
            setPassword('')
            setMatchPassword('')
        } catch (err) {
            if (!err?.response) {
                setError('No Server Response')
            } else if (err.response?.status === 409) {
                setError('This email is already registered')
            } else {
                setError('Registration Failed')
            }
            errorRef.current.focus()
        }
    }

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded shadow-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Success!</h1>
                        <p className="text-lg">
                            <a href="/login" className="text-indigo-500 hover:text-indigo-700 underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </section>)
                : (
                    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-100">
                        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">

                            <h2 className="text-2xl font-bold text-center">Register</h2>
                            <p ref={errorRef} className={error ? 'text-red-600 bg-red-100 p-2 rounded mb-4' : 'sr-only'}>{error}</p>

                            <form className="space-y-4" onSubmit={handleSubmit} method="POST">

                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                                        First Name
                                        <FontAwesomeIcon icon={faCheck} className={`ml-2 ${validFirstname ? "text-green-500" : "hidden"}`} />
                                        <FontAwesomeIcon icon={faTimes} className={`ml-2 ${validFirstname || !firstname ? "hidden" : "text-red-500"}`} />
                                    </label>
                                    <input type="text" id="firstname" name="firstname" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        required
                                        autoComplete='off'
                                        ref={firstnameRef}
                                        value={firstname}
                                        aria-invalid={validFirstname ? 'false' : 'true'}
                                        aria-describedby='firstnamenote'
                                        onChange={(e) => setFirstname(e.target.value)}
                                        onFocus={() => setFirstnameFocus(true)}
                                        onBlur={() => setFirstnameFocus(false)}
                                    />
                                    <p id='firstnamenote' className={`text-sm ${firstnameFocus && firstname && !validFirstname ? "block text-gray-600 bg-gray-100 p-4 rounded border border-gray-300 mt-2 mb-4" : "hidden"}`} aria-live='polite'>
                                        <FontAwesomeIcon icon={faInfoCircle} className='mr-2 text-gray-500' />
                                        Please enter between 1 to 50 alphabetic characters only
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                        <FontAwesomeIcon icon={faCheck} className={`ml-2 ${validLastname ? "text-green-500" : "hidden"}`} />
                                        <FontAwesomeIcon icon={faTimes} className={`ml-2 ${validLastname || !lastname ? "hidden" : "text-red-500"}`} />
                                    </label>
                                    <input type="text" id="lastname" name="lastname" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        required
                                        autoComplete='off'
                                        value={lastname}
                                        aria-invalid={validLastname ? 'false' : 'true'}
                                        aria-describedby='lastnamenote'
                                        onChange={(e) => setLastname(e.target.value)}
                                        onFocus={() => setLastnameFocus(true)}
                                        onBlur={() => setLastnameFocus(false)}
                                    />
                                    <p id='lastnamenote' className={`text-sm ${lastnameFocus && lastname && !validLastname ? "block text-gray-600 bg-gray-100 p-4 rounded border border-gray-300 mt-2 mb-4" : "hidden"}`} aria-live='polite'>
                                        <FontAwesomeIcon icon={faInfoCircle} className='mr-2 text-gray-500' />
                                        Please enter between 1 to 50 alphabetic characters only
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                        <FontAwesomeIcon icon={faCheck} className={`ml-2 ${validEmail ? "text-green-500" : "hidden"}`} />
                                        <FontAwesomeIcon icon={faTimes} className={`ml-2 ${validEmail || !email ? "hidden" : "text-red-500"}`} />
                                    </label>
                                    <input type="email" id="email" name="email" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        required
                                        autoComplete='off'
                                        value={email}
                                        aria-invalid={validEmail ? 'false' : 'true'}
                                        aria-describedby='emailnote'
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <div id='emailnote' className={`text-sm ${emailFocus && email && !validEmail ? "block text-gray-600 bg-gray-100 p-4 rounded border border-gray-300 mt-2 mb-4" : "hidden"}`} aria-live='polite'>
                                        <FontAwesomeIcon icon={faInfoCircle} className='mr-2 text-gray-500' />
                                        <span className="font-semibold">Please ensure the email meets the following criteria:</span>
                                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                                            <li>Must be in the format: example@domain.com</li>
                                            <li>No spaces before or after the email address</li>
                                            <li>Should not contain special characters like &, %, $, etc.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                        <FontAwesomeIcon icon={faCheck} className={`ml-2 ${validPassword ? "text-green-500" : "hidden"}`} />
                                        <FontAwesomeIcon icon={faTimes} className={`ml-2 ${validPassword || !password ? "hidden" : "text-red-500"}`} />
                                    </label>
                                    <input type="password" id="password" name="password" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        required
                                        value={password}
                                        aria-invalid={validPassword ? 'false' : 'true'}
                                        aria-describedby='passwordnote'
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <div id='passwordnote' className={`text-sm ${passwordFocus && !validPassword ? "block text-gray-600 bg-gray-100 p-4 rounded border border-gray-300 mt-2 mb-4" : "hidden"}`} aria-live='polite'>
                                        <FontAwesomeIcon icon={faInfoCircle} className='mr-2 text-gray-500' />
                                        <span className="font-semibold">Please ensure the password meets the following criteria:</span>
                                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                                            <li>Must include uppercase and lowercase letters, a number and a special character</li>
                                            <li>Enter between 8 to 24 characters</li>
                                            <li>Allowed special characters: <span aria-label="exclamation mark">!</span>
                                                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                                                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                        <FontAwesomeIcon icon={faCheck} className={`ml-2 ${validMatchPassword && matchPassword ? "text-green-500" : "hidden"}`} />
                                        <FontAwesomeIcon icon={faTimes} className={`ml-2 ${validMatchPassword || !matchPassword ? "hidden" : "text-red-500"}`} />
                                    </label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                        required
                                        autoComplete='off'
                                        value={matchPassword}
                                        aria-invalid={validMatchPassword ? 'false' : 'true'}
                                        aria-describedby='matchpasswordnote'
                                        onChange={(e) => setMatchPassword(e.target.value)}
                                        onFocus={() => setMatchPasswordFocus(true)}
                                        onBlur={() => setMatchPasswordFocus(false)}
                                    />
                                    <div id='matchpasswordnote' className={`text-sm ${matchPasswordFocus && !validMatchPassword ? "block text-gray-600 bg-gray-100 p-4 rounded border border-gray-300 mt-2 mb-4" : "hidden"}`} aria-live='polite'>
                                        <FontAwesomeIcon icon={faInfoCircle} className='mr-2 text-gray-500' />
                                        <span className="font-semibold">Please ensure the password confirmation meets the following criteria:</span>
                                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                                            <li>Must match the first password input field</li>
                                            <li>Must include uppercase and lowercase letters, a number and a special character</li>
                                            <li>Enter between 8 to 24 characters</li>
                                            <li>Allowed special characters: <span aria-label="exclamation mark">!</span>
                                                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                                                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <button type="submit"
                                    className={`w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${validFirstname && validLastname && validEmail && validPassword && validMatchPassword
                                            ? 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!validFirstname || !validLastname || !validEmail || !validPassword || !validMatchPassword ? true : false}
                                >Sign Up</button>

                            </form>
                            <p className="text-sm text-gray-600">
                                Already registered?<br />
                                <span className="inline-block mt-2">
                                    <Link to="/Login" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign In</Link>
                                </span>
                            </p>
                        </div>
                    </div >)}
        </>
    )
}

export default RegistrationForm;