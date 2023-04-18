import clsx from "clsx";

interface IPrependDecorator {
  children?: any;
  className?: string;
}

const PrependDecorator = (props: IPrependDecorator) => {
  const { children, className = "", ...rest } = props;

  const isArray = Array.isArray(children);
  const prependArray = (isArray ? children : [children]).filter(Boolean);

  if (!prependArray.length) return null;

  return prependArray.map((decorator, decoratorIndex) => {
    return (
      <div
        //
        key={`prepend-decorator-${decoratorIndex}`}
        className={clsx("text-input-prepend", className)}
        {...rest}
      >
        {decorator}
      </div>
    );
  });
};

export default PrependDecorator;
