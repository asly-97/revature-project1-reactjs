import Card from 'react-bootstrap/Card';
import { ReimbursementInterface } from '../Interfaces/ReimbursementInterface';
import { formatDistance } from 'date-fns';

function ReimbursementItem(reimbursement:ReimbursementInterface) {

  let color = '';
  let resolvedAt = null;

  if(reimbursement.status == 'approved'){
    color = 'success';
    resolvedAt = Date.parse(reimbursement.resolvedAt?.toString()+'');
  }
  else if(reimbursement.status == 'denied'){
      color = 'danger';
      resolvedAt = Date.parse(reimbursement.resolvedAt?.toString()+'');
  }
  else
      color = 'secondary';

  let createdAt = Date.parse(reimbursement.createdAt?.toString()+'');

  return (
    <Card
          bg={color}
          key={color}
          text='white'
          style={{ width: '18rem' }}
          className="mb-3"
        >
          <Card.Header>{reimbursement.amount}$</Card.Header>
          <Card.Body>
            <Card.Title>{reimbursement.user?.firstName+' '+reimbursement.user?.lastName}</Card.Title>
            <Card.Text>{reimbursement.description} </Card.Text>
            <Card.Text>created : ({formatDistance(createdAt, new Date())} ago)</Card.Text>
            <Card.Text>{reimbursement.status} {resolvedAt? " : ("+formatDistance(resolvedAt, new Date()) +" ago)" : ""} </Card.Text>
          </Card.Body>
        </Card>
  );
}

export default ReimbursementItem;