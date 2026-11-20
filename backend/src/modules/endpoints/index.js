import express from 'express';
import  {getAllEndpointsController,
    getEndpointByIdController,
    createEndpointController,
    updateEndpointController,
    toggleEndpointStatusController,
    deleteEndpointController} from './controller.js';


const endpointsRouter=express.router();
endpointsRouter.get('/', getAllEndpointsController);
endpointsRouter.post('/', createEndpointController);
endpointsRouter.get('/:id', getEndpointByIdController);
endpointsRouter.patch('/:id', updateEndpointController);
endpointsRouter.patch('/:id/toggle', toggleEndpointStatusController);
endpointsRouter.delete('/:id', deleteEndpointController);

export default endpointsRouter;