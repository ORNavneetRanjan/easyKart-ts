import { useContext, ComponentType } from "react";
import { AlertContext, CartContext, UserContext } from "./Context";

// Define a generic type for the provider
type ProviderType<T> = React.Context<T | undefined>;

function withProvider<T>(provider: ProviderType<T>) {
  // Define the HOC with typing
  function MyHOC<P extends object>(IncomingComponent: ComponentType<P>) {
    function OutgoingComponent(props: P) {
      const contextData = useContext(provider);

      // Handle the case where contextData might be undefined
      if (contextData === undefined) {
        throw new Error("Context must be used within a Provider");
      }

      return <IncomingComponent {...props} {...contextData} />;
    }
    return OutgoingComponent;
  }
  return MyHOC;
}

export default withProvider;

// Define specific HOCs for each context
export const withUser = withProvider(UserContext);
export const withAlert = withProvider(AlertContext);
export const withCart = withProvider(CartContext);
