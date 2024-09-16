"use client"
import { useState } from "react"
import Image from "next/image"
export default function UserProfile() {
	const initialUser = {
		name: "John Doe",
		email: "johndoe@example.com",
		address: "123 Main St, Anytown",
		phone: "+1234567890",
	}

	const [userInfo, setUserInfo] = useState(initialUser)
	const [isEditing, setIsEditing] = useState(false)
	const [validationErrors, setValidationErrors] = useState({})

	const validateInput = (field, value) => {
		let errors = {}
		if (field === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
			errors.email = "Invalid email format"
		}
		if (field === "phone" && !/^\+?[1-9]\d{1,14}$/.test(value)) {
			errors.phone = "Invalid phone number format"
		}
		return errors
	}

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleCancel = () => {
		setUserInfo(initialUser)
		setIsEditing(false)
		setValidationErrors({})
	}

	const handleSave = () => {
		if (Object.keys(validationErrors).length === 0) {
			// No error left
			setIsEditing(false)
		} else {
			setIsEditing(true)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setUserInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}))

		const errors = validateInput(name, value)
		setValidationErrors((prevErrors) => ({
			...prevErrors,
			...errors,
		}))
		if (Object.keys(errors).length == 0) {
			setValidationErrors({})
		}
	}

	return (
		<div className='container grid grid-cols-8 absolute left-0 right-0 top-10 flex items '>
			<div className='profile-info col-start-2 col-end-8 flex flex-col items-center justify-center bg-gradient-to-r  text-black border-2 border-black pb-10 rounded-xl bg-slate-300 '>
				<h1 className='m-5 text-5xl'>User Profile</h1>
				<Image src='/static/images/image.png' height={300} width={300} alt='a random person image ' />
				<div className='flex gap-10 m-5 w-1/2 text-xl relative left-10 '>
					<label>Name</label>
					{isEditing ? (
						<input className=' w-auto' type='text' name='name' value={userInfo.name} onChange={handleChange} />
					) : (
						<p>{userInfo.name}</p>
					)}
				</div>

				<div className='flex gap-10 m-5 w-1/2  text-xl relative left-10  '>
					<label>Email</label>
					{isEditing ? (
						<input type='text' name='email' value={userInfo.email} onChange={handleChange} />
					) : (
						<p>{userInfo.email}</p>
					)}
					{validationErrors.email && <p className='error'>{validationErrors.email}</p>}
				</div>

				<div className=' flex gap-10 m-5 w-1/2 text-xl relative left-10  '>
					<label>Phone</label>
					{isEditing ? (
						<input type='text' name='phone' value={userInfo.phone} onChange={handleChange} />
					) : (
						<p>{userInfo.phone}</p>
					)}
					{validationErrors.phone && <p className='error'>{validationErrors.phone}</p>}
				</div>

				<div className='relative flex gap-10 m-5 w-1/2 justify-stretch text-xl relative left-10 '>
					<label>Address</label>
					{isEditing ? (
						<input type='text' name='address' value={userInfo.address} onChange={handleChange} />
					) : (
						<p>{userInfo.address}</p>
					)}
				</div>
				{isEditing ? (
					<div className='buttons flex gap-10  w-1/2 relative left-10'>
						<button className='w-32' onClick={handleSave}>
							Save
						</button>
						<button className='w-32' onClick={handleCancel}>
							Cancel
						</button>
					</div>
				) : (
					<button className='w-40' onClick={handleEdit}>
						Edit
					</button>
				)}
			</div>

			<style jsx>{`
				.container {
				}
				.profile-info {
					margin-bottom: 20px;
				}
				.profile-info label {
					font-weight: bold;
				}
				.profile-info input {
					display: block;
					width: 100%;
					padding: 8px;
					margin: 10px 0;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
				.error {
					color: red;
					font-size: 0.9em;
				}
				.buttons {
					display: flex;
					justify-content: space-between;
				}
				button {
					padding: 10px 20px;
					border: none;
					background-color: #0070f3;
					color: white;
					border-radius: 4px;
					cursor: pointer;
				}
				button:hover {
					background-color: #005bb5;
				}
			`}</style>
		</div>
	)
}
