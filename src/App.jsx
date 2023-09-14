import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import parse, { domToReact } from "html-react-parser";

const queryClient = new QueryClient();

const useBackendComponent = () => {
    const {
        isLoading,
        error,
        data: Component,
    } = useQuery({
        queryKey: ["backendTable"],
        queryFn: () =>
            fetch("/api/table")
                .then((res) => {
                    return res.text();
                })
                .then((html) => {
                    return parse(html, {
                        replace: (domNode) => {
                            if (
                                domNode.attributes &&
                                domNode.attributes.length > 0
                            ) {
                                const view = domNode.attributes.reduce(
                                    (acc, curr) => {
                                        if (
                                            curr.name &&
                                            curr.name.indexOf("x-view") > -1
                                        ) {
                                            console.log(curr);
                                            return {
                                                type: curr.name.split(
                                                    "x-view-"
                                                )[1],
                                                value: JSON.parse(curr.value),
                                            };
                                        }
                                        return curr;
                                    },
                                    {}
                                );
                                switch (view.type) {
                                    case "button":
                                        return (
                                            <button
                                                onClick={() =>
                                                    alert(
                                                        JSON.stringify(
                                                            view.value
                                                        )
                                                    )
                                                }
                                            >
                                                {domToReact(domNode.children)}
                                            </button>
                                        );
                                }
                            }
                        },
                    });
                }),
    });

    return {
        isLoading,
        error,
        Component,
    };
};

const BackendComponent = () => {
    const { Component, isLoading, error } = useBackendComponent();
    return (
        <>
            {isLoading && "Loading..."}
            {error && <pre>JSON.parse(error)</pre>}
            {!isLoading && !error && Component}
        </>
    );
};

import "./App.css";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1>Hello App</h1>
            <BackendComponent />
        </QueryClientProvider>
    );
}

export default App;
