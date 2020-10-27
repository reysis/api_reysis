<?php
// api/src/Swagger/SwaggerDecorator.php

namespace App\Swagger;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

final class SwaggerDecorator implements NormalizerInterface
{
    private $decorated;

    public function __construct(NormalizerInterface $decorated)
    {
        $this->decorated = $decorated;
    }

    public function normalize($object, $format = null, array $context = [])
    {
        $docs = $this->decorated->normalize($object, $format, $context);

        $consumes = ["application/ld+json", "application/json"];
        $responses[201] = [
            'description' =>  'OK',
            'schema'=>[
                'type'=> 'object',
                'required'=>[
                    'username',
                    'password'
                ],
                'properties'=>[
                    'username'=>[
                        'type'=> 'string'
                    ],
                    'password'=>[
                        'type'=> 'string'
                    ]
                ]
            ]
        ];
        dd($docs);

        $customDefinition = [
            [
                'name' => 'username',
                'description' => 'Nombre del Usuario',
                'default' => 'id',
                'required' => true,
                'type' => 'string',
                'in' => 'query',
            ],
            [
                'name' => 'password',
                'description' => 'Contraseña del Usuario',
                'required' => true,
                'type' => 'string',
                'in' => 'query',
            ]
        ];

        $docs['paths']['/api/login']['post']['parameters'] = $customDefinition;
        $docs['paths']['/api/login']['post']['consumes'][] = $consumes;
        $docs['paths']['/api/login']['post']['produces'][] = $consumes;
        $docs['paths']['/api/login']['post']['responses'][] = $responses;

        // Override title
        $docs['info']['title'] = 'Reysis Documentation';

        return $docs;
    }

    public function supportsNormalization($data, $format = null)
    {
        return $this->decorated->supportsNormalization($data, $format);
    }
}