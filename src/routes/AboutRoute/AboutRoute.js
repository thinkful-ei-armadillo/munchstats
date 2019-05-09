import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import AuthApiService from '../../services/auth-api-service';
import EventsApiService from '../../services/events-api-service';
import UserContext from '../../contexts/UserContext';
import './AboutRoute.css';


class AboutRoute extends Component {
    static defaultProps = {
        history: {
        push: () => { }
        }
    }

    static contextType = UserContext;

    handleLoginSuccess = () => {
        const { history } = this.props;
        history.push('/');
    }

    handleSubmit = ev => {
        ev.preventDefault();
        this.context.loadingTrue();

        this.setState({ error: null });

        AuthApiService.postLogin({
        username: 'test',
        password: 'pass'
        })
        .then(res => {
            this.context.processLogin(res.authToken);
            this.onLoginSuccess();
            this.context.loadingFalse();
            EventsApiService.getTodaysEvents()
            .then(res => this.context.setTodayEvents(res))
            .catch(e => this.context.setError(e));
        })
        .catch(res => {
            this.setState({ error: res.error });
            this.context.loadingFalse();
        });
    };


    render() {
        return (
            <section className="aboutPage">
                <h2>About Munch Stats</h2>
                <p>Munch Stats is a meal tracking app. What makes Munch Stats different is our approach to building meals within the app. Using the Edamam API, you can build and track your meals ingredient by ingredient and save each meal for multiple trackings. You can also set daily goals for calories, carbohydrates, fat, and/or protein and track how your daily consumption compares to your goals.</p>
                <h3>How to Use Munch Stats</h3>
                <ul className="aboutList">
                    <li><span className="aboutListItems">Creating & Editing Meals:</span> After logging in, you are taken to your dashboard. If you click on the button to create, view or edit meals, you are taken to the page listing your meals where you can create a new meal or edit one of your current meals. Choosing either action takes you to the "Meals Detail" page where you can look over the nutritional information as well as add or drop ingredients from your meal. To add an ingredient, click on the "add ingredient" link and simply search for an ingredient. Select the food item from the search results. Our app will automatically add the ingredient's nutritional information to the meal's total. Once satisfied with your meal, you can hit the back button and your meal is saved!</li>
                    <li><span className="aboutListItems">Logging Meals & Snacks:</span> If you click the button to log a meal or snack, you are taken to where you can begin tracking your nutrition. Using the meals you just created, you can track those meals as either breakfast, brunch, lunch, or dinner. Had a banana as a snack? You can track that as well by logging snacks!</li>
                    <li><span className="aboutListItems">Setting Goals:</span> If you click on your name in the top right corner of your screen, you are taken to your profile page. On this page, you can set your daily goals for either calories, carbs, fat, and/or protein. You can also change your display to dark mode if you'd like.</li>
                    <li><span className="aboutListItems">Tracking Your Goals:</span> From the dashboard, if you click on the button to view your past reports, you are taken to your daily reports page where you can see how you are eating compared to the daily goals that you just set up!</li>
                </ul>
                <form className='testLogin' onSubmit={this.handleSubmit}>
                    <h4>Want to test it out? Log in as a Test User</h4>
                    <Button type='submit'>Test Login</Button>
                </form>
                <footer>
                    Development Team: <a href='https://github.com/michaelbramble'>Michael Bramble</a>, <a href='https://github.com/geordo9'>Geordie Connell</a>, <a href='https://github.com/DavidHaugen'>David Haugen</a>, <a href='https://github.com/bobnearents'>Bob Nearents</a>.
                </footer>
            </section>
        )
    }
}

export default AboutRoute;