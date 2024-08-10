import React, { useState, useRef, useEffect } from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { Employee } from '../../Interfaces/Employee';
import axios from 'axios';
import { __api_url } from '../../utils/constants';
import { ok } from 'assert';


interface UserSelectProps {
  onSelect: (employee: Employee) => void;
}

const UserSelectInput: React.FC<UserSelectProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<Employee[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [employees,setEmployees] = useState<Employee[]>([]);


  useEffect(()=>{
    getAllEmployees();
  },[])

  useEffect( () => setFilteredUsers(employees), [employees] )

  const getAllEmployees = async () => {
    const _token = localStorage.getItem('token');

    var response = await axios.get(`${__api_url}/user`,{
        headers:{
            Authorization: `Bearer ${_token}`,
        }
    });

    console.log('UserSelectInput - getAllEmployees',response);

    if(response.status == 200){
        setEmployees(response.data);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredUsers(
      employees.filter(employee => 
        employee.firstName?.toLowerCase().includes(term) || 
        employee.lastName?.toLowerCase().includes(term) || 
        employee.username?.toLowerCase().includes(term)
      )
    );
  };

  const handleSelect = (employee: Employee) => {
    onSelect(employee);
    setSearchTerm(`${employee.firstName} ${employee.lastName} - @${employee.username}`); // Optional: Set the input to the selected user's name
    setIsFocused(false); // Hide the list after selection
  };

  return (
    <Dropdown show={isFocused} >
      <Form.Control
        type="text"
        placeholder="Search by name or username..."
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Small delay to allow click
      />
      <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', width: '100%', zIndex: 1050 }}>
        {filteredUsers.map(employee => (
          <Dropdown.Item 
            key={employee.userId} 
            onClick={() => handleSelect(employee)}
          >
            {`${employee.firstName} ${employee.lastName} @${employee.username}`}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserSelectInput;
