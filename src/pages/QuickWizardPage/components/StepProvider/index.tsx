import lodash from "lodash";
import { cloneElement, createContext, Dispatch, SetStateAction } from "react";
import { useState, useContext } from "react";

interface StepContextProps {
  funnel: FunnelType;
  setFunnel: Dispatch<SetStateAction<FunnelType>>;
}

interface StepProviderProps {
  children: any;
}

export const StepContext = createContext<StepContextProps>({} as StepContextProps);

function StepProvider ({ children }: StepProviderProps) {
  const [funnel, setFunnel] = useState<FunnelType>("sms");

  function renderChildren (children: any) {
    // children might have acceptedFunnel props
    // if a child doesn't have acceptedFunnel props, it means the child
    // can be rendered by any funnel
    let renderedIndex = 0;
    const renderedChildren = children.map(
      (child: any, index: number) => {
        // Do not render if it has acceptedFunnels but the currentFunnel is not
        // in acceptedFunnels.
        const acceptedFunnels = lodash(child).get("props.acceptedFunnels");
        if (acceptedFunnels && !acceptedFunnels.includes(funnel)) return null;

        renderedIndex += 1;
        return cloneElement(child, {
          ...child.props,
          key: `StepProvider-${index}`,
          number: renderedIndex
        })
      }
    )

    return renderedChildren;
  }

  return (
    <StepContext.Provider
      value={{
        funnel,
        setFunnel
      }}
    >
      {renderChildren(children)}
    </StepContext.Provider>
  )
}

export function useStep () {
  return useContext(StepContext);
}

export default StepProvider;