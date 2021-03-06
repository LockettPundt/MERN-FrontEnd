/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Form, FormField, Box, Button, TextInput, Select,
} from 'grommet';
import axios from 'axios';
import API_URL from '../utils/appUtils';
import userAuth from '../utils/userAuth';


const UpdateJob = () => {
  const { id } = useParams();
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');
  const [interview, setInterview] = useState('Interviewed?');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const history = useHistory();

  const updateJob = async () => {
    const authResponse = await userAuth();

    if (authResponse) {
      const response = await axios.put(`${API_URL}jobs/${id}`, {
        company,
        position,
        skillsNeeded,
        interview: interview === 'True',
      });
      return history.push('/myjobs');
    }
    return history.push('/');
  };

  const removeJob = async () => {
    const authResponse = await userAuth();
    if (authResponse) {
      const response = await axios.delete(`${API_URL}jobs/${id}`);
      return history.push('/myjobs');
    }
    return history.push('/');
  };


  useEffect(() => {
    const jobInfo = async (jobId) => {
      const authResponse = await userAuth();
      if (authResponse) {
        const response = await axios.get(`${API_URL}jobs/${jobId}`);
        setCompany(response.data[0].company);
        setInterview(response.data[0].interview ? 'True' : 'False');
        setSkillsNeeded(response.data[0].skillsNeeded.join(', '));
        setPosition(response.data[0].position);
      } else {
        history.push('/');
      }
    };

    jobInfo(id);
  }, [id, history]);

  return (
    <Box
      direction="column"
      margin={{
        horizontal: 'auto',
        top: 'small',
      }}
      responsive
      pad="medium"
      width="medium"
    >
      <Form onSubmit={updateJob}>
        <FormField>
          <TextInput
            value={company}
            required
            onChange={(e) => setCompany(e.target.value)}
          />
        </FormField>
        <FormField>
          <TextInput
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
          />
        </FormField>

        <FormField>
          <TextInput
            value={skillsNeeded}
            required
            onChange={(e) => setSkillsNeeded(e.target.value)}
          />
        </FormField>
        <FormField>
          <Select
            placeholder={interview}
            options={['True', 'False']}
            onChange={({ option }) => setInterview(option)}
          />
        </FormField>
        <Box
          direction="column"
          align="center"
          width="85%"
          margin={{
            horizontal: 'auto',
            top: 'medium',
          }}
        >
          <Box
            direction="row"
          >
            <Button
              margin="xsmall"
              type="submit"
              alignSelf="center"
              label="Update"
            />
            <Button
              margin="xsmall"
              type="button"
              label="Remove"
              onClick={removeJob}
            />

          </Box>


        </Box>

      </Form>
    </Box>
  );
};


export default UpdateJob;
