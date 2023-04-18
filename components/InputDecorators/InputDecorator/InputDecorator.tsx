import clsx from "clsx";

interface IInputDecorator {
  children?: any;
  className?: string;
}

const InputDecorator = (props: IInputDecorator) => {
  const { children, className = "", ...rest } = props;

  const isArray = Array.isArray(children);
  const decoratorArray = (isArray ? children : [children]).filter(Boolean);

  if (!decoratorArray.length) return null;

  return decoratorArray.map((decorator, decoratorIndex) => {
    return (
      <div
        //
        key={`input-decorator-${decoratorIndex}`}
        className={clsx("text-input-decorator", className)}
        {...rest}
      >
        {decorator}
      </div>
    );
  });
};

export default InputDecorator;
