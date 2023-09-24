export const handleStatusColor=(orderStatus:string,setStatusColor:React.Dispatch<React.SetStateAction<string>>,setStatus:React.Dispatch<React.SetStateAction<string>>)=>{
  if (orderStatus === 'Pending') {
    setStatusColor('warning');
    setStatus('Pending');
  }
  else if (orderStatus === 'Approved') {
    setStatusColor('info');
    setStatus('Approved');
  }
  else if (orderStatus === 'In progress') {
    setStatusColor('secondary');
    setStatus('In progress');
  }
  else if (orderStatus === 'Delivering') {
    setStatusColor('success');
    setStatus('Delivering');
  } else if (orderStatus === 'Cancelled') {
    setStatusColor('danger');
    setStatus('Cancelled');
  }
  else if (orderStatus === 'Delivered' || orderStatus === 'Completed') {
    setStatusColor('primary');
    setStatus('Delivered');
  }
  else{
    setStatusColor('primary');
    setStatus('Pending');
  }
}