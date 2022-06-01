import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class CustomerDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,      
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  // 고객의 id가 매개변수로 들어왔을때 삭제를 진행 하도록 함
  deleteCustomer(id) {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    });
    // 삭제가 된 이후에 고객 목록을 새로 갱신해서 보여줌
    this.props.stateRefresh();
  }

  render() {
    return (
      <div>
        {/* <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button> */}
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle onClose={this.handleClose}>
            삭제 경고
          </DialogTitle>
          <DialogContent>
            <Typography>
              선택한 고객 정보가 삭제됩니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerDelete;