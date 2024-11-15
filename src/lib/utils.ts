import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const randomGender = () => {
	const genders = ['male', 'female'];
	return genders[Math.floor(Math.random() * genders.length)];
};

export const randomNumber = () => {
	return Math.floor(Math.random() * 78) + 1;
};

export const generateRandomPerson = () => {
	const gender = randomGender();
	const maleNames = ['John', 'David', 'Michael', 'Chris', 'Mark', 'Paul', 'James', 'Andrew'];
	const femaleNames = [
		'Emily',
		'Jessica',
		'Ashley',
		'Sarah',
		'Melissa',
		'Amanda',
		'Brittany',
		'Elizabeth'
	];
	const names = gender === 'male' ? maleNames : femaleNames;
	const name = names[Math.floor(Math.random() * names.length)];
	const cities = [
		'New York',
		'Los Angeles',
		'Chicago',
		'Houston',
		'Philadelphia',
		'Phoenix',
		'San Antonio',
		'San Diego',
		'Dallas',
		'San Jose'
	];
	const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
	const city = cities[Math.floor(Math.random() * cities.length)];
	const state = states[Math.floor(Math.random() * states.length)];

	return { gender, name, city, state };
};

export const generateRandomPeople = (count: number) => {
	const people = [];
	for (let i = 0; i < count; i++) {
		people.push(generateRandomPerson());
	}

	return people;
};
