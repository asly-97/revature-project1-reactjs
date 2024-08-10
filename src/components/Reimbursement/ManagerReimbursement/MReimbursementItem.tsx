import Card from 'react-bootstrap/Card';
import { format, formatDistance } from 'date-fns';
import { ReimbursementInterface } from '../../../Interfaces/ReimbursementInterface';
import { Button, Container, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MReimbursementItem(props:any) {

  let color = '';
  let resolvedAt = null;

  const {reimbursement, onResolve} = props

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
          className="mb-2"
        >
          <Card.Header>{reimbursement.amount}$</Card.Header>
          <Card.Body>
            <Card.Title>
              <Link className="link-warning link-offset-2 link-underline-opacity-0" to={`/user/${reimbursement.user?.userId}`}>{reimbursement.user?.firstName+' '+reimbursement.user?.lastName}</Link>
            </Card.Title>
            <Card.Text>{reimbursement.description}</Card.Text>
            <Card.Text>
            created : {formatDistance(createdAt, new Date())} ago | {format(createdAt, 'MMMM do')}
            </Card.Text>
            <Card.Text>{reimbursement.status} {resolvedAt && ` : ${formatDistance(resolvedAt, new Date())} ago | ${format(resolvedAt, 'MMMM do')}`} </Card.Text>
          </Card.Body>

          

          {reimbursement.status == 'pending' && (
            <Card.Footer>
              <Button onClick={()=>onResolve(reimbursement.reimbId,'approved')} variant='success'>Approve</Button>{'  '}
              <Button onClick={()=>onResolve(reimbursement.reimbId,'denied')} variant='danger'>Deny</Button>
            </Card.Footer>
          )}

        </Card>
  );
}

export default MReimbursementItem;