import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from "./CustomerDelete";

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image} alt="profile" /></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
      </TableRow>
    )
  }
}

// class Customer extends React.Component {
//   render() {
//     return (
//       // 보통은 React를 사용할때는 데이터 내용을 하드 코딩을 하지 않고.
//       // 어떠한 데이터를 출력 하고자 할 때 props를 사용함.
//       //   <div>
//       //     <h2>이종찬</h2>
//       //     <p>960000</p>
//       //     <p>남자</p>
//       //     <p>취준생</p>
//       //   </div>

//       // 아래가 props를 사용하여 데이터를 넣음.
//       //   <div>
//       //     <h2>{this.props.name}</h2>
//       //     <p>{this.props.birthday}</p>
//       //     <p>{this.props.gender}</p>
//       //     <p>{this.props.job}</p>
//       //   </div>

//       <div>
//         <CustomerProfile
//           id={this.props.id}
//           image={this.props.image}
//           name={this.props.name}
//         />
//         <CustomerInfo
//           birthday={this.props.birthday}
//           gender={this.props.gender}
//           job={this.props.job}
//         />
//       </div>
//     );
//   }
// }

// class CustomerProfile extends React.Component {
//   render() {
//     return (
//       <div>
//         {/* alt 속성은 시각장애인 분들이 어떠한 이미지가 있는지를 알려주는 것. */}
//         <img src={this.props.image} alt="profile" />
//         <h2>
//           {this.props.name}({this.props.id})
//         </h2>
//       </div>
//     );
//   }
// }

// class CustomerInfo extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>{this.props.birthday}</p>
//         <p>{this.props.gender}</p>
//         <p>{this.props.job}</p>
//       </div>
//     );
//   }
// }

export default Customer;
