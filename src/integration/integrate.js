function integrate_left_rect(f, start, end, step = NaN, split = NaN, y = NaN) {
  if (isNaN(step) && !isNaN(split)) {
    step = (end - start) / split;
  }
  if (isNaN(step)) {
    return console.log('something\'s wrong about the arguments');
  }

  const expression = math.parse(f).compile();

  let x = start;
  let result = 0;
  while (x <= (end - step)) {
    result += expression.evaluate({'x': x, 'y': y});
    x += step;
  }
  return step * result;
}

function integrate_right_rect(f, start, end, step = NaN, split = NaN, y = NaN) {
  if (isNaN(step) && !isNaN(split)) {
    step = (end - start) / split;
  }
  if (isNaN(step)) {
    return console.log('something\'s wrong about the arguments');
  }

  const expression = math.parse(f).compile();

  let x = start + step;
  let result = 0;
  while (x <= end) {
    result += expression.evaluate({'x': x, 'y': y});
    x += step;
  }
  return step * result;
}

function integrate_trap(f, start, end, step = NaN, split = NaN, y = NaN) {
  if (isNaN(step) && !isNaN(split)) {
    step = (end - start) / split;
  }
  if (isNaN(step)) {
    return console.log('something\'s wrong about the arguments');
  }

  const expression = math.parse(f).compile();

  let x = start + step;
  let result = 0;
  while (x <= (end - step)) {
    result += expression.evaluate({'x': x, 'y': y});
    x += step;
  }
  return ((expression.evaluate({'x': start, 'y': y}) +
      expression.evaluate({'x': end, 'y': y})) / 2 + result) * step;
}

function integrate_par(f, start, end, step = NaN, split = NaN, y = NaN) {
  if (isNaN(step) && !isNaN(split)) {
    step = (end - start) / split;
  }
  if (isNaN(step)) {
    return console.log('something\'s wrong about the arguments');
  }

  const expression = math.parse(f).compile();

  let fraction_odd = 0;
  let x = start + step;
  while (x <= (end - step)) {
    fraction_odd += expression.evaluate({'x': x, 'y': y});
    x += 2 * step;
  }

  let fraction_even = 0;
  x = start + (2 * step);
  while (x <= (end - (2 * step))) {
    fraction_even += expression.evaluate({'x': x, 'y': y});
    x += 2 * step;
  }

  return (expression.evaluate({'x': start, 'y': y}) +
      expression.evaluate({'x': end, 'y': y}) +
      (4 * fraction_odd) +
      (2 * fraction_even)) * (step / 3);
}

function integrate_double(f, start, end, eps, method) {
  let step = Math.sqrt(eps);

  let integral1;
  let integral2 = 0;
  do {
    integral1 = integral2;
    integral2 = method(f, start, end, step);
    step /= 2;
  } while (Math.abs(integral1 - integral2) > eps);
  return integral2;
}

function integrate_double_optimised(f, start, end, eps, method) {
  let step = Math.sqrt(eps);
  let margin = 0;

  let integral1;
  let integral2 = 0;
  do {
    integral1 = integral2;
    integral2 = method(f, start + margin, end, step);
    step /= 2;
    margin = step / 2;
  } while (Math.abs(integral1 - integral2) > eps);
  return integral2;
}

