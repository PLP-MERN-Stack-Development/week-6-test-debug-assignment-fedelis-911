import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console for debugging
        console.error('Error caught by Error Boundary:', error, errorInfo);

        // Update state with error details
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // In production, you would send this to an error reporting service
        if (process.env.NODE_ENV === 'production') {
            // Example: logErrorToService(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return ( <
                div className = "error-boundary" >
                <
                h2 > 🚨Oops!Something went wrong < /h2> <
                p > We 're sorry, but something unexpected happened. Please try refreshing the page.</p>

                {
                    process.env.NODE_ENV === 'development' && ( <
                        details style = {
                            { whiteSpace: 'pre-wrap', marginTop: '20px' }
                        } >
                        <
                        summary > Error Details(Development Only) < /summary> <
                        pre > { this.state.error && this.state.error.toString() } { this.state.errorInfo && this.state.errorInfo.componentStack } <
                        /pre> < /
                        details >
                    )
                }

                <
                button className = "btn btn-primary"
                onClick = {
                    () => window.location.reload()
                }
                style = {
                    { marginTop: '20px' }
                } >
                Refresh Page <
                /button> < /
                div >
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;