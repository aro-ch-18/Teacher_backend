import inquirer from 'inquirer';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_URL = `http://localhost:${process.env.PORT}/teacher`;
// Main menu function
const mainMenu = async () => {
    const choices = [
        'Add a new teacher',
        'Update a teacher',
        'Delete a teacher',
        'Fetch all teachers',
        'Fetch a specific teacher',
        'Filter teachers',
        'Exit'
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: choices
        }
    ]);

    switch (action) {
        case 'Add a new teacher':
            await addTeacher();
            break;
        case 'Update a teacher':
            await updateTeacher();
            break;
        case 'Delete a teacher':
            await deleteTeacher();
            break;
        case 'Fetch all teachers':
            await fetchAllTeachers();
            break;
        case 'Fetch a specific teacher':
            await fetchSpecificTeacher();
            break;
        case 'Filter teachers':
            await filterTeachers();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    await mainMenu();
};

// Add a new teacher
const addTeacher = async () => {
    const { fullName, age, DOB, noOfClasses } = await inquirer.prompt([
        { type: 'input', name: 'fullName', message: 'Enter teacher full name:' },
        { type: 'input', name: 'age', message: 'Enter teacher age:' },
        { type: 'input', name: 'DOB', message: 'Enter teacher date of birth (DD-MM-YYYY):' },
        { type: 'input', name: 'noOfClasses', message: 'Enter number of classes:' }
    ]);

    try {
        const response = await axios.post(`${API_URL}/addTeacher`, { fullName, age, DOB, noOfClasses });
        console.log('Teacher added successfully:', response.data);
    } catch (error) {
        console.error('Error adding teacher:', error.message);
    }
};

// Update a teacher
const updateTeacher = async () => {
    const { id, fullName, age, DOB, noOfClasses } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter teacher ID to update:' },
        { type: 'input', name: 'fullName', message: 'Enter new teacher full name:' },
        { type: 'input', name: 'age', message: 'Enter new teacher age:' },
        { type: 'input', name: 'DOB', message: 'Enter new teacher date of birth (YYYY-MM-DD):' },
        { type: 'input', name: 'noOfClasses', message: 'Enter new number of classes:' }
    ]);

    try {
        const response = await axios.put(`${API_URL}/updateTeacher/${id}`, { fullName, age, DOB, noOfClasses });
        console.log('Teacher updated successfully:', response.data);
    } catch (error) {
        console.error('Error updating teacher:', error.message);
    }
};

// Delete a teacher
const deleteTeacher = async () => {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter teacher ID to delete:' }
    ]);

    try {
        const response = await axios.delete(`${API_URL}/deleteTeacher/${id}`);
        console.log('Teacher deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting teacher:', error.message);
    }
};

// Fetch all teachers
const fetchAllTeachers = async () => {
    try {
        const response = await axios.get(`${API_URL}/fetchTeachers`);
        console.log('Teachers:', response.data.teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error.message);
    }
};

// Fetch a specific teacher
const fetchSpecificTeacher = async () => {
    const { id } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter teacher ID to fetch:' }
    ]);

    try {
        const response = await axios.get(`${API_URL}/fetchPTeacher/${id}`);
        console.log('Teacher:', response.data.teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error.message);
    }
};

// Filter teachers
const filterTeachers = async () => {
    const { age, noOfClasses } = await inquirer.prompt([
        { type: 'input', name: 'age', message: 'Enter age to filter (leave blank if not filtering by age):' },
        { type: 'input', name: 'noOfClasses', message: 'Enter number of classes to filter (leave blank if not filtering by number of classes):' }
    ]);

    const filterParams = {};
    if (age) filterParams.age = age;
    if (noOfClasses) filterParams.noOfClasses = noOfClasses;

    try {
        const response = await axios.get(`${API_URL}/filterTeacher`, { params: filterParams });
        console.log('Filtered teachers:', response.data.teachers);
    } catch (error) {
        console.error('Error filtering teachers:', error.message);
    }
};

// Start the CLI application
mainMenu();
