import React, { useState } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardTitle,
    Alert,
    Spinner
} from 'reactstrap';
import { signup } from '../grpcClient'
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showCNFPassword, setShowCNFPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('')
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('Passwords do not match!');
            return;
        }
        setLoading(true);
        const res = await signup(formData)
        if (res?.message?.includes('successfully')) {
            setSuccessMsg(res.message)
            setLoading(false);
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }

        console.log('Form submitted:', res);
    };

    const toggleShowPassword = () => {
        setShowPassword(preVal => !preVal)
    }

    const toggleShowCNFPassword = () => {
        setShowCNFPassword(preVal => !preVal)
    }

    return (
        <Container className="mt-7 d-flex justify-content-center">
            <Card className="hover-card" style={{
                maxWidth: '420px',
                padding: '30px',
                width: '375px',
                borderRadius: '20px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            }}>
                <CardBody>
                    <CardTitle tag="h3" className="text-center text-dark">Create Account</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username" >Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="input-hover"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name" >Full Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="input-hover"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" >Email Address</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-hover"
                            />
                        </FormGroup>
                        <FormGroup style={{ position: 'relative' }}>
                            <Label for="password" >Password</Label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-hover"
                            />
                            {/* <i id="passwordEye" class={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} onClick={toggleShowPassword}></i> */}
                            <i class={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} style={{ position: 'absolute', bottom: '13px', right: '7px' }} onClick={toggleShowPassword}></i>
                        </FormGroup>
                        <FormGroup style={{ position: 'relative' }}>
                            <Label for="confirmPassword" >Confirm Password</Label>
                            <Input
                                type={showCNFPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input-hover"
                            />
                            <i class={`fa-regular ${showCNFPassword ? 'fa-eye' : 'fa-eye-slash'}`} style={{ position: 'absolute', bottom: '13px', right: '7px' }} onClick={toggleShowCNFPassword}></i>
                        </FormGroup>
                        {successMsg && <span style={{ position: 'absolute', bottom: '9.7rem', color: 'green', fontSize: '12px' }}><i class="fa-solid fa-circle-check"></i> {successMsg}</span>}
                        {errorMsg && <span style={{ position: 'absolute', bottom: '9.7rem', color: 'red', fontSize: '12px' }}><i class="fa-solid fa-triangle-exclamation"></i> {errorMsg}</span>}
                        {/* <span style={{position: 'absolute', bottom: '9.7rem', color: 'green', fontSize: '12px'}}>Ankit is signed up successfully</span> */}
                        <Button color="primary" block type="submit" className="mt-3 shadow-sm button-hover signupCTA" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Sign Up'}
                        </Button>
                    </Form>
                    <div className="text-center mt-4">
                        <small className="text-muted">Already have an account? <a href="#" className="text-primary font-weight-bold" onClick={() => { navigate('/login') }}>Log in</a></small>
                    </div>
                </CardBody>
            </Card>
            <style>
                {`
          .input-hover:hover {
            border-color: #007bff;
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
          }
          .hover-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .hover-card:hover {
            transform: scale(1.05);
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
          }
          .button-hover {
            transition: all 0.3s ease-in-out;
          }
          .button-hover:hover {
            background: linear-gradient(90deg, #007bff, #0056b3);
            transform: scale(1.08);
          }
        `}
            </style>
        </Container>
    );
};

export default SignupForm;
