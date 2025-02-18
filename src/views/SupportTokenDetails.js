import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge
} from 'reactstrap';

const SupportTokenDetails = ({ data }) => {

  const navigate = useNavigate()

  const addClickHandler = () => {
    navigate('/admin/supported-token-drivers/upload')
  }

  return (
    <Card className="shadow ">
      <CardHeader>
        <h3 className="mb-0">Token Driver Details</h3>
        <button onClick={addClickHandler} style={{ position: 'absolute', right: '18px', top: '12px', border: 'none', borderRadius: '.25rem', background: '#5e72e4', color: '#fff', padding: '6px 12px' }}><i class="fa-regular fa-plus"></i>&nbsp; Add</button>
      </CardHeader>
      <CardBody>
        <Table responsive hover className="align-items-center">
          <thead>
            <tr>
              <th className='text-md'>Driver Name</th>
              <th className='text-md'>Version</th>
            </tr>
          </thead>
          <tbody>
            {data.map((driver, index) => (
              <tr key={index}>
                <td>
                  <Badge color="info" className="badge-lg text-sm text-capitalize">
                    {driver.name}
                  </Badge>
                </td>
                <td>
                  <Badge color="success" className="badge-lg text-sm">
                    {driver.version}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default SupportTokenDetails;
