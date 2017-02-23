import React from 'react';
import Header from './Header';
import { Grid, Row, Col } from "react-bootstrap";

class Main extends React.Component{
    setTitle(){
        let title = this.props.children.props.route.path;
        return title === undefined ? 'Invoice App. Invoices' : `Invoice App. ${title.charAt(0).toUpperCase() + title.slice(1)}`
    }
    render(){       
              
        document.getElementsByTagName("title")[0].innerHTML = this.setTitle();
        return(
            <div>
                <Header />                
                <Grid>
                    
                    <Row>
                    <Col xs={12}>                    
                        {this.props.children}                  
                    </Col>
                    </Row>
                    </Grid>
                
            </div>
        );
    }
}

export default Main;