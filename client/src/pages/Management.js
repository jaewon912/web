import React, { Component } from "react";
import Customer from "../components/Customer";
import CustomerAdd from "../components/CustomerAdd";
import "../App.css";

// Material-ui
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
// CSS
import { withStyles } from "@material-ui/core/styles";

// Material-ui bar
// client폴더로 가서 npm install --save @material-ui/icons
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
    root: {
        width: "100%",
        minWidth: 1080,
        //marginTop: theme.spacing.unit * 3, //윗쪽 여백을 3의 가중치 만큼
        // overflowX: "auto",
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: "flex",
        justifyContent: "center",
    },
    paper: {
        marginLeft: 18,
        marginRight: 18,
    },
    grow: {
        flexGrow: 1,
    },
    tableHead: {
        fontSize: "1.0rem",
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit,
            width: "auto",
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: "100%",
        position: "absolute",
        PointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "Center",
    },
    inputRoot: {
        color: "inherit",
        width: "100%",
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
            "&:focus": {
                width: 200,
            },
        },
    },
});

class Management extends Component {


    constructor(props) {
        super(props);
        this.state = {
            customers: "",
            completed: 0,
            searchKeyword: "",
        };
    }

    stateRefresh = () => {
        this.setState({
            customers: "",
            completed: 0,
            searchKeyword: "",
        });
        // 초기화 후 다시 고객 목록을 불러와야 하기 때문에 아래에 고객 데이터 부분을 가져옴
        this.callApi()
            .then((res) => this.setState({ customers: res }))
            .catch((err) => console.log(err));
    };

    // api서버에 접근을 해서 데이터를 받아오는 등의 작업은 componentDidMount에서 해줄 수 있음
    // 모든 component가 실제로 마운트가 완료가 되었을때 작동
    componentDidMount() {
        // 고객 데이터를 받아오고
        this.callApi()
            // 그것을 받아서 setState의 customers 변수에 넣음
            .then((res) => this.setState({ customers: res }))
            // 오류 문구
            .catch((err) => console.log(err));
    }

    // 비동기적으로 수행할 수 있도록 해주는 함수 부분
    callApi = async () => {
        // 아래 경로로 접속을 해서 그 데이터들을 body에 저장을 함
        const response = await fetch("/api/customers");
        const body = await response.json();
        return body;
    };

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };

    render() {
        // data매개변수에 입력을 받았을때
        const filteredComponents = (data) => {
            data = data.filter((c) => {
                // 각 원소 중에서 그 원소의 이름 값에 사용자가 입력한 searchKeyword가 포함되어 있는지 확인
                return c.name.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
                return (
                    <Customer
                        stateRefresh={this.stateRefresh}
                        key={c.id}
                        id={c.id}
                        image={c.image}
                        name={c.name}
                        birthday={c.birthday}
                        gender={c.gender}
                        gob={c.job}
                    />
                );
            });
        };

        // props는 변경될 수 없는 그런 데이터를 명시 할때 사용
        const { classes } = this.props;
        const cellList = [
            "번호",
            "프로필 이미지",
            "이름",
            "생년월일",
            "성별",
            "직업",
            "설정",
        ];

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            고객 관리 시스템
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="검색하기"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                name="searchKeyword"
                                value={this.state.searchKeyword}
                                onChange={this.handleValueChange}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <CustomerAdd stateRefresh={this.stateRefresh} />
                </div>
                <Paper className={classes.paper}>
                    {/* <Customer
          id={customers[0].id}
          image={customers[0].image}
          name={customers[0].name}
          birthday={customers[0].birthday}
          gender={customers[0].gender}
          job={customers[0].job}
        />
        <Customer
          id={customers[1].id}
          image={customers[1].image}
          name={customers[1].name}
          birthday={customers[1].birthday}
          gender={customers[1].gender}
          job={customers[1].job}
        />
        <Customer
          id={customers[2].id}
          image={customers[2].image}
          name={customers[2].name}
          birthday={customers[2].birthday}
          gender={customers[2].gender}
          job={customers[2].job}
        /> */}

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {/* 배열로 처리 */}
                                {/* <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
                                {cellList.map((c) => {
                                    return (
                                        <TableCell className={classes.tableHead}>{c}</TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // 위에 처럼 코드를 작성 할 경우 데이터가 늘어남에 따라 용량이 커지기 떄문에 반복함수를 사용하여 아래처럼 표현함.
                                // JavaScript에서는 map이라는 함수로 반복시킬 수 있음.
                                // map 함수를 사용할때에는 key 값이 있어야 함.
                                // 위에서 state안에 값들을 비동기적으로 가져 왔기 때문에 처음에는 값이 비어져 있기 때문에 오류가 발생함
                                // 따라서 조건을 주어서 데이터 값이 존재 할 경우에만 출력 될 수 있도록 해줌
                                this.state.customers ? (
                                    // (
                                    //   this.state.customers.map((c) => {
                                    //     return (
                                    //       <Customer
                                    //         stateRefresh={this.stateRefresh}
                                    //         key={c.id}
                                    //         id={c.id}
                                    //         image={c.image}
                                    //         name={c.name}
                                    //         birthday={c.birthday}
                                    //         gender={c.gender}
                                    //         job={c.job}
                                    //       />
                                    //     );
                                    //   })
                                    // )app
                                    filteredComponents(this.state.customers)
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="6" align="center">
                                            <CircularProgress variant="indeterminate" />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Management);