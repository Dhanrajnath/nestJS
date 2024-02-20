import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const DUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log(`Executing ${ctx.getHandler().name} with arguments:`, request.body);
    return request.body;
})
