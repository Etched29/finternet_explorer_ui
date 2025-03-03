import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getResolverList } from '../../grpcClient'

import {
    Table,
    Card,
    CardHeader,
    CardBody,
    Badge,
    Button,
    Collapse,
} from 'reactstrap';

const UserAccount = ({theUser}) => {

    const [userData, setUserData] = useState([])
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const username = theUser
        setUsername(username)
    }, [searchParams])
    const navigateToBindForm = (username) => {
        localStorage.setItem('selectedUser', username);
        navigate('/admin/user/account/bind')
    };

    const parseAccountInfo = (info) => {
        try {
            return JSON.parse(info);
        } catch (e) {
            return { error: 'Invalid JSON', name: 'Unknown', amount: 0 };
        }
    };

    const fetchUsers = async () => {
        try {
            const usersList = await getResolverList()
            console.log(usersList)
            const { pathMappingList } = usersList
            let username = theUser;
            const grouped = { [username]: { username: username, bindings: [], id: username } };

            // // First, organize localStorage users
            // users.forEach(user => {
            //   grouped[theUser] = {
            //     username: theUser,
            //     bindings: user.bindings || [],
            //     id: user.id
            //   };
            // });

            // Then, process gRPC data and match by suffix
            pathMappingList.forEach(item => {
                console.log(item);
                const accountInfo = parseAccountInfo(item.accountInfo);
                const path_fragments = item.path.split("/");
                const username = path_fragments[2];




                // Find matching user by suffix
                const matchingUser = Object.values(grouped).find(user =>
                    item.driverName?.toLowerCase().endsWith(user.username.toLowerCase())
                );

                if (matchingUser) {
                    // Add to existing user's bindings
                    grouped[username].bindings.push({
                        ...item,
                        accountInfo: accountInfo
                    });
                } else if (!grouped[username]) {
                    // Create new user entry if no match found
                    // grouped[username] = {
                    //   username: username,
                    //   bindings: [{
                    //     ...item,
                    //     accountInfo: accountInfo
                    //   }]
                    // };
                } else {
                    // Add to existing user's bindings
                    grouped[username].bindings.push({
                        ...item,
                        accountInfo: accountInfo
                    });
                }
            });
            setUserData(grouped[username])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <Card className="shadow users mx-auto" style={{ maxWidth: '90%', minWidth: '800px' }}>
            <CardHeader className="border-0">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0 text-lg">{username}</h3>

                    <div className="d-flex gap-2 ">
                        <Button
                            color="primary"
                            onClick={() => navigateToBindForm(username)}
                            title='Link Account'
                        >
                            <i className='linkIcon' class="fa-solid fa-link"></i>
                        </Button>
                        <Button
                            color="danger"
                            onClick={() => {
                                // const updatedUsers = users.filter(user => user.username !== username);
                                // localStorage.setItem('users', JSON.stringify(updatedUsers));
                                // setUsers(updatedUsers);
                            }}
                        >
                            <i class="fa-solid fa-trash"></i>
                        </Button>
                        <Button onClick={() => window.history.back()}>
                            <i class="fa-solid fa-left-long"></i>
                        </Button>
                    </div>

                    {/* <Button
                className='navigateToBindCTA-2'
                color="primary"
                onClick={() => window.location.href = '/admin/user/add'}
              >
                <i class="fa-solid fa-user-plus"></i>
                &nbsp;&nbsp;Add User
              </Button> */}
                </div>
            </CardHeader>
            <CardBody>
                <Table responsive hover className="align-items-center sub-table">
                    <thead>
                        <tr>
                            {/* <th>User Name</th> */}
                            <th className='text-sm'>Path</th>
                            <th className='text-sm'>Token Driver Name</th>
                            <th className='text-sm'>Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.bindings?.map((binding, index) => (
                            <tr key={binding.path || index}>
                                {/* <td>{username}</td> */}
                                    <td>
                                        <span className="text-primary text-sm">{binding.path || 'Not set'}</span>
                                    </td>
                                <td>
                                    <Badge color="info" className="badge-lg text-sm text-capitalize">
                                        {binding.driverName}
                                    </Badge>
                                </td>
                                <td>
                                    <Badge color="success" className="badge-lg text-sm">
                                        {binding.driverVersion}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                        {userData.bindings?.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No bindings available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default UserAccount;